package br.edu.senacsp.projeto.medico.controllers;

import br.edu.senacsp.projeto.medico.domain.atendimento.AtendimentoDTO;
import br.edu.senacsp.projeto.medico.domain.atendimento.AtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/atendimento")
public class AtendimentoController {

    @Autowired
    private AtendimentoService atendimentoService;

    @PostMapping("/agendar") @CrossOrigin
    public ResponseEntity<?> agendar(@RequestBody AtendimentoDTO atendimentoDTO) {

        return atendimentoService.agendar(atendimentoDTO);
    }

    @GetMapping("/medico/{tempo}/{idMedico}") @CrossOrigin
    public ResponseEntity<?> getAtendimentos(@PathVariable Long idMedico, @PathVariable(required = false) String tempo) {

        return atendimentoService.getAtendimentosMedico(idMedico, tempo);

    }

    @GetMapping("/paciente/{tempo}/{idPaciente}") @CrossOrigin
    public ResponseEntity<?> getAtendimentosPaciente(@PathVariable Long idPaciente, @PathVariable(required = false) String tempo) {

        return atendimentoService.getAtendimentosPaciente(idPaciente, tempo);

    }

    @DeleteMapping("/cancelar/{id}") @CrossOrigin
    public ResponseEntity<?> cancelarAtendimento(@PathVariable Long id) {

        return atendimentoService.cancelarAtendimento(id);

    }
}
