module.exports = class ServicoCalculoFatura {

    constructor(repo) {
        this.repo = repo;
    }

    calcularTotalApresentacao(apre) {
        let total = 0;

        if (this.repo.getPeca(apre).tipo === "comedia") {
            total = 30000;
            if (apre.audiencia > 20) {
                total += 10000 + 500 * (apre.audiencia - 20);
            }
            total += 300 * apre.audiencia;
        } else if (this.repo.getPeca(apre).tipo === "tragedia") {
            total = 40000;
            if (apre.audiencia > 30) {
                total += 1000 * (apre.audiencia - 30);
            }
        } else {
            throw new Error(`Peça desconhecia: ${this.getPeca(apre).tipo}`);
        }

        return total;
    }

    getPeca(apresentacao) {
        return pecas[apresentacao.id];
    }

    calcularCredito(apre) {
        let creditos = 0;
        creditos += Math.max(apre.audiencia - 30, 0);
        if (this.repo.getPeca(apre).tipo === "comedia")
            creditos += Math.floor(apre.audiencia / 5);
        return creditos;
    }

    calcularTotalCreditos(apresentacoes) {
        let creditos = 0;
        for (let apre of apresentacoes) {
            creditos += this.calcularCredito(apre);
        }
        return creditos;
    }

    calcularTotalFatura(apresentacoes) {
        let total = 0, totalfatura = 0;
        for (let apre of apresentacoes) {
            total = this.calcularTotalApresentacao(apre);
            totalfatura += total;
        }
        return totalfatura / 100;
    }
}
