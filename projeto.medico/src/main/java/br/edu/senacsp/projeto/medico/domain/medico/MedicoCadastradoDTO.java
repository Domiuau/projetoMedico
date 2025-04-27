package br.edu.senacsp.projeto.medico.domain.medico;

public record MedicoCadastradoDTO(String nome, String crm, String email, Double valorConsulta, String especialidade, Long id) {

    public MedicoCadastradoDTO(Medico medico) {
        this(medico.getNome(), medico.getCrm(), medico.getEmail(), medico.getValorConsulta(), medico.getEspecialidade(), medico.getId());
    }

}
