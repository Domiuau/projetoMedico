package br.edu.senacsp.projeto.medico.domain.atendimento;

import br.edu.senacsp.projeto.medico.domain.dto.ErroDTO;
import br.edu.senacsp.projeto.medico.domain.medico.MedicoRepository;
import br.edu.senacsp.projeto.medico.domain.paciente.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AtendimentoService {

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public ResponseEntity<?> agendar(AtendimentoDTO atendimentoDTO) {

        var medico = medicoRepository.findById(atendimentoDTO.idMedico());
        var paciente = pacienteRepository.findById(atendimentoDTO.idPaciente());

        if (medico.isPresent()) {
            if (paciente.isPresent()) {

                Atendimento atendimento = new Atendimento(paciente.get(), medico.get(), atendimentoDTO.date(), atendimentoDTO.sala());
                System.out.println("sasaddsadsasad: " + atendimento);
                atendimentoRepository.save(atendimento);
                return ResponseEntity.status(HttpStatus.CREATED).body(new AtendimentoConfirmadoDTO(atendimento.getId(), paciente.get().getNome(), medico.get().getNome(), medico.get().getEspecialidade() , atendimento.getSala(), atendimento.getDataAtendimento()));

            }

            return ResponseEntity.badRequest().body(new ErroDTO("Paciente não encontrado", "Paciente com o ID: " + atendimentoDTO.idPaciente() + " não foi encontrado"));

        }

        return ResponseEntity.badRequest().body(new ErroDTO("Sem permissão", "Você precisa ser uma médico para agendar uma consulta"));

    }

    public ResponseEntity<?> getAtendimentosPaciente(Long id, String tempo) {

        var paciente = pacienteRepository.findById(id);

        if (paciente.isPresent()) {

         tempo = tempo == null ? "" : tempo;

                var atendimentos = tempo.equals("futuro") ?
                        atendimentoRepository.findByPacienteIdAndDataAtendimentoAfter(id, new Date()) :
                        tempo.equals("passado") ?
                                atendimentoRepository.findByPacienteIdAndDataAtendimentoBefore(id, new Date()) :
                                paciente.get().getAtendimentos();

                return ResponseEntity.ok(atendimentos.stream().map(atendimento ->
                        new AtendimentoConfirmadoDTO(atendimento)).toList());

        }

        return ResponseEntity.badRequest().body(new ErroDTO("Paciente não encontrado", "O paciente com o ID: " + id + " não foi encontrado"));

    }

    public ResponseEntity<?> getAtendimentosMedico(Long id, String tempo) {

        var medico = medicoRepository.findById(id);

        if (medico.isPresent()) {

            tempo = tempo == null ? "" : tempo;

            var atendimentos = tempo.equals("futuro") ?
                    atendimentoRepository.findByMedicoIdAndDataAtendimentoAfter(id, new Date()) :
                    tempo.equals("passado") ?
                            atendimentoRepository.findByMedicoIdAndDataAtendimentoBefore(id, new Date()) :
                            medico.get().getAtendimentos();

            return ResponseEntity.ok(atendimentos.stream().map(atendimento ->
                    new AtendimentoConfirmadoDTO(atendimento)).toList());

        }

        return ResponseEntity.badRequest().body(new ErroDTO("Medico não encontrado", "O paciente com o ID: " + id + " não foi encontrado"));

    }

    public ResponseEntity<?> cancelarAtendimento(Long id) {

        var atendimento = atendimentoRepository.findById(id);

        if (atendimento.isPresent()) {

            atendimentoRepository.delete(atendimento.get());
            return ResponseEntity.ok("Atendimento cancelado com sucesso");

        }

        return ResponseEntity.badRequest().body(new ErroDTO("Atendimento não encontrado", "O atendimento com o ID: " + id + " não foi encontrado"));

    }
}
