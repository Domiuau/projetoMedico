package br.edu.senacsp.projeto.medico.domain.atendimento;

import java.util.Date;

public record AtendimentoDTO(Long idPaciente, Long idMedico, Date date, String sala) {
}
