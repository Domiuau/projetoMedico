package br.edu.senacsp.projeto.medico.domain.atendimento;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    List<Atendimento> findByPacienteIdAndDataAtendimentoBefore(Long pacienteId, Date data);
    List<Atendimento> findByPacienteIdAndDataAtendimentoAfter(Long pacienteId, Date data);

    List<Atendimento> findByMedicoIdAndDataAtendimentoBefore(Long medicoId, Date data);
    List<Atendimento> findByMedicoIdAndDataAtendimentoAfter(Long medicoId, Date data);


}
