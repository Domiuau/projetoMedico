package br.edu.senacsp.projeto.medico.domain.medico;

import br.edu.senacsp.projeto.medico.domain.dto.ErroDTO;
import br.edu.senacsp.projeto.medico.domain.dto.LoginDTO;
import br.edu.senacsp.projeto.medico.domain.dto.LoginRealizadoDTO;
import br.edu.senacsp.projeto.medico.domain.paciente.AtualizarPacienteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    public ResponseEntity<?> cadastrar(MedicoDTO medicoDTO) {

        Medico medico = new Medico(medicoDTO.nome(), medicoDTO.crm(), medicoDTO.especialidade(), medicoDTO.telefone(), medicoDTO.email(), medicoDTO.senha(), medicoDTO.valorConsulta());
        medicoRepository.save(medico);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new MedicoCadastradoDTO(medico)
        );

    }

    public ResponseEntity<?> login(LoginDTO loginDTO) {

        var medico = medicoRepository.findByEmailAndAtivoTrue(loginDTO.email());

        if (medico.isPresent()) {

            if (medico.get().getSenha().equals(loginDTO.senha())) {

                return ResponseEntity.ok(new LoginRealizadoDTO(medico.get().getNome(), medico.get().getId()));
            } else {

                return ResponseEntity.badRequest().body(new ErroDTO("Senha incorreta", "Verifique sua senha e tente novamente"));

            }

        }

        return ResponseEntity.badRequest().body(new ErroDTO("Email não encontrado", "Verifique seu email e tente novamente"));

    }

    @Transactional
    public ResponseEntity<?> atualizar(AtualizarMedicoDTO atualizarMedicoDTO) {

        var medico = medicoRepository.findById(atualizarMedicoDTO.id());

        if (medico.isPresent()) {
            Medico medicoAtualizado = medico.get();
            medicoAtualizado.setNome(atualizarMedicoDTO.nome());
            medicoAtualizado.setEspecialidade(atualizarMedicoDTO.especialidade());
            medicoAtualizado.setTelefone(atualizarMedicoDTO.telefone());
            medicoAtualizado.setEmail(atualizarMedicoDTO.email());
            medicoAtualizado.setSenha(atualizarMedicoDTO.senha());
            return ResponseEntity.ok(new MedicoDTO(medico.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Médico não encontrado", "Verifique as informações e tente novamente"));

    }

    @Transactional
    public ResponseEntity<?> desativar(Long id) {

        var medico = medicoRepository.findById(id);


        if (medico.isPresent()) {
            medico.get().setAtivo(false);
            return ResponseEntity.ok("Medico " + medico.get().getNome() + " desativado com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Medico não encontrado", "Verifique as informações e tente novamente"));
    }

    public ResponseEntity<?> getMedicosDisponiveis() {
        var medicos = medicoRepository.findByAtivoTrue();
        if (medicos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Nenhum médico disponível", "Verifique as informações e tente novamente"));
        }
        return ResponseEntity.ok(medicos.stream().map(MedicoCadastradoDTO::new).toList());
    }

    public ResponseEntity<?> getMedicosDisponiveisBusca(String busca) {

        var medicos = medicoRepository.findByAtivoTrueAndNomeContainingIgnoreCaseOrAtivoTrueAndEspecialidadeContainingIgnoreCase(busca, busca);
        if (medicos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Nenhum médico disponível", "Verifique as informações e tente novamente"));
        }
        return ResponseEntity.ok(medicos.stream().map(MedicoCadastradoDTO::new).toList());



    }

    public ResponseEntity<?> getMedico(Long idMedico) {

        var medico = medicoRepository.findById(idMedico);

        if (medico.isPresent()) {
            return ResponseEntity.ok(new MedicoCadastradoDTO(medico.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Médico não encontrado", "Verifique as informações e tente novamente"));

    }
}
