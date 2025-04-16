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

    @PostMapping("/agendar")
    public ResponseEntity<?> agendar(@RequestBody AtendimentoDTO atendimentoDTO) {

        return atendimentoService.agendar(atendimentoDTO);
    }

    @GetMapping("/medico/{tempo}/{idMedico}")
    public ResponseEntity<?> getAtendimentos(@PathVariable Long idMedico, @PathVariable(required = false) String tempo) {

        return atendimentoService.getAtendimentosMedico(idMedico, tempo);

    }

    @GetMapping("/paciente/{tempo}/{idPaciente}")
    public ResponseEntity<?> getAtendimentosPaciente(@PathVariable Long idPaciente, @PathVariable(required = false) String tempo) {

        return atendimentoService.getAtendimentosPaciente(idPaciente, tempo);

    }
}
