package br.edu.senacsp.projeto.medico.domain.medico;

import br.edu.senacsp.projeto.medico.domain.paciente.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    Optional<Medico> findByEmail(String email);
    Optional<Medico> findByEmailAndAtivoTrue(String email);
    List<Medico> findByAtivoTrue();
    List<Medico> findByAtivoTrueAndNomeContainingIgnoreCaseOrAtivoTrueAndEspecialidadeContainingIgnoreCase(
            String nomeBusca,
            String especialidadeBusca
    );
}
