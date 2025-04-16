package br.edu.senacsp.projeto.medico.controllers;

import br.edu.senacsp.projeto.medico.domain.dto.LoginDTO;
import br.edu.senacsp.projeto.medico.domain.medico.AtualizarMedicoDTO;
import br.edu.senacsp.projeto.medico.domain.medico.MedicoDTO;
import br.edu.senacsp.projeto.medico.domain.medico.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medico")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastroMedico(@RequestBody MedicoDTO medicoDTO) {

        return medicoService.cadastrar(medicoDTO);

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginMedico(@RequestBody LoginDTO loginDTO) {

        return medicoService.login(loginDTO);

    }

    @PutMapping("/atualizar")
    public ResponseEntity<?> atualizarMedico(@RequestBody AtualizarMedicoDTO atualizarMedicoDTO) {

        return medicoService.atualizar(atualizarMedicoDTO);

    }

    @DeleteMapping("/deletar/{idMedico}")
    public ResponseEntity<?> deletgarMedico(@PathVariable Long idMedico) {

        return medicoService.desativar(idMedico);

    }


}
