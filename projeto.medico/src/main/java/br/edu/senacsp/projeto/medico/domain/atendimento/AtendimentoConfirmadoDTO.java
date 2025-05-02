package br.edu.senacsp.projeto.medico.domain.atendimento;

import java.util.Date;

public record AtendimentoConfirmadoDTO(Long id, String nomePaciente, String nomeMedico, String especialidade,  String sala, Date date) {

    public AtendimentoConfirmadoDTO(Atendimento atendimento) {
        this(atendimento.getId(), atendimento.getPaciente().getNome(), atendimento.getMedico().getNome(), atendimento.getMedico().getEspecialidade(), atendimento.getSala(), atendimento.getDataAtendimento());
    }
}
