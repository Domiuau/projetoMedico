package br.edu.senacsp.projeto.medico.domain.paciente;

import br.edu.senacsp.projeto.medico.domain.dto.ErroDTO;
import br.edu.senacsp.projeto.medico.domain.dto.LoginDTO;
import br.edu.senacsp.projeto.medico.domain.dto.LoginRealizadoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PacienteService {

    private static final Logger log = LoggerFactory.getLogger(PacienteService.class);
    @Autowired
    private PacienteRepository pacienteRepository;

    public ResponseEntity<?> cadastro(PacienteDTO pacienteDTO) {

        Paciente paciente = new Paciente(pacienteDTO.nome(), pacienteDTO.cpf(), pacienteDTO.endereco(), pacienteDTO.telefone(), pacienteDTO.email(), pacienteDTO.senha());
        pacienteRepository.save(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PacienteCadastradoDTO(paciente.getNome(), paciente.getEmail(), paciente.getId()));
    }

    public ResponseEntity<?> login(LoginDTO loginDTO) {

        var paciente = pacienteRepository.findByEmail(loginDTO.email());

        if (paciente.isPresent()) {

            if (paciente.get().getSenha().equals(loginDTO.senha())) {

                return ResponseEntity.ok(new LoginRealizadoDTO(paciente.get().getNome(), paciente.get().getId()));
            } else {

                return ResponseEntity.badRequest().body(new ErroDTO("Senha incorreta", "Verifique sua senha e tente novamente"));

            }

        }

        return ResponseEntity.badRequest().body(new ErroDTO("Email não encontrado", "Verifique seu email e tente novamente"));

    }

    @Transactional
    public ResponseEntity<?> atualizar(AtualizarPacienteDTO atualizarPacienteDTO) {

        var paciente = pacienteRepository.findById(atualizarPacienteDTO.id());

        if (paciente.isPresent()) {
            Paciente pacienteAtualizado = paciente.get();
            pacienteAtualizado.setNome(atualizarPacienteDTO.nome());
            pacienteAtualizado.setEndereco(atualizarPacienteDTO.endereco());
            pacienteAtualizado.setTelefone(atualizarPacienteDTO.telefone());
            pacienteAtualizado.setEmail(atualizarPacienteDTO.email());
            pacienteAtualizado.setSenha(atualizarPacienteDTO.senha());

            return ResponseEntity.ok(new PacienteDTO(paciente.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Paciente não encontrado", "Verifique as informações e tente novamente"));
        }

    }

    @Transactional
    public ResponseEntity<?> desativar(Long id) {

        var paciente = pacienteRepository.findById(id);


        if (paciente.isPresent()) {
            paciente.get().setAtivo(false);
            return ResponseEntity.ok("Paciente " + paciente.get().getNome() + " desativado com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErroDTO("Paciente não encontrado", "Verifique as informações e tente novamente"));
    }
}
