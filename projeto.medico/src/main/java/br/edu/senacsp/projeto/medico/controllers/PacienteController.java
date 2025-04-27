package br.edu.senacsp.projeto.medico.controllers;

import br.edu.senacsp.projeto.medico.domain.dto.LoginDTO;
import br.edu.senacsp.projeto.medico.domain.paciente.AtualizarPacienteDTO;
import br.edu.senacsp.projeto.medico.domain.paciente.PacienteDTO;
import br.edu.senacsp.projeto.medico.domain.paciente.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paciente")
public class PacienteController {


    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/cadastrar") @CrossOrigin
    public ResponseEntity<?> cadastroPaciente(@RequestBody PacienteDTO pacienteDTO) {

       return pacienteService.cadastro(pacienteDTO);

    }

    @PostMapping("/login") @CrossOrigin
    public ResponseEntity<?> loginPaciente(@RequestBody LoginDTO loginDTO) {

        return pacienteService.login(loginDTO);

    }

    @PutMapping("/atualizar") @CrossOrigin
    public ResponseEntity<?> atualizarPaciente(@RequestBody AtualizarPacienteDTO atualizarPacienteDTO) {

        return pacienteService.atualizar(atualizarPacienteDTO);

    }

    @DeleteMapping("/deletar/{idPaciente}") @CrossOrigin
    public ResponseEntity<?> deletarPaciente(@PathVariable Long idPaciente) {

        return pacienteService.desativar(idPaciente);

    }

}
