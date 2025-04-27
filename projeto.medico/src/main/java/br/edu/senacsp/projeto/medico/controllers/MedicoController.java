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

    @PostMapping("/cadastrar") @CrossOrigin
    public ResponseEntity<?> cadastroMedico(@RequestBody MedicoDTO medicoDTO) {

        return medicoService.cadastrar(medicoDTO);

    }

    @PostMapping("/login") @CrossOrigin
    public ResponseEntity<?> loginMedico(@RequestBody LoginDTO loginDTO) {

        return medicoService.login(loginDTO);

    }

    @PutMapping("/atualizar") @CrossOrigin
    public ResponseEntity<?> atualizarMedico(@RequestBody AtualizarMedicoDTO atualizarMedicoDTO) {

        return medicoService.atualizar(atualizarMedicoDTO);

    }

    @DeleteMapping("/deletar/{idMedico}") @CrossOrigin
    public ResponseEntity<?> deletgarMedico(@PathVariable Long idMedico) {

        return medicoService.desativar(idMedico);

    }

    @GetMapping("/disponiveis") @CrossOrigin
    public ResponseEntity<?> getMedicosDisponiveis() {

        return medicoService.getMedicosDisponiveis();

    }

    @GetMapping("/disponiveis/{busca}") @CrossOrigin
    public ResponseEntity<?> getMedicosDisponiveis(@PathVariable(required = false) String busca) {
        System.out.println(busca.equals("null"));

        return (busca.equals("null")) ?

                medicoService.getMedicosDisponiveis()
                :
                medicoService.getMedicosDisponiveisBusca(busca);
    }

    @GetMapping("/{idMedico}") @CrossOrigin
    public ResponseEntity<?> getMedico(@PathVariable Long idMedico) {

        return medicoService.getMedico(idMedico);

    }


}
