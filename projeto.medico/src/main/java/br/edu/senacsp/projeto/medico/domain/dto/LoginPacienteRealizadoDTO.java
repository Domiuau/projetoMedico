package br.edu.senacsp.projeto.medico.domain.dto;

import br.edu.senacsp.projeto.medico.domain.paciente.Paciente;

public record LoginPacienteRealizadoDTO(String nome, String role, Long id) {
    public LoginPacienteRealizadoDTO(String nome, String role, Long id) {
        this.nome = nome;
        this.role = role;
        this.id = id;
    }

    public LoginPacienteRealizadoDTO(Paciente paciente) {
        this(paciente.getNome(), paciente.getRole(), paciente.getId());
    }

}
