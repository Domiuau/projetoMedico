package br.edu.senacsp.projeto.medico.domain.atendimento;

import java.util.Date;

public record AtendimentoConfirmadoDTO(Long id, String nomePaciente, String nomeMedico, String sala, Date date) {

    public AtendimentoConfirmadoDTO(Atendimento atendimento) {
        this(atendimento.getId(), atendimento.getPaciente().getNome(), atendimento.getMedico().getNome(), atendimento.getSala(), atendimento.getDataAtendimento());
    }
}
