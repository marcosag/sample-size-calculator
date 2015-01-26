var UKG = UKG || {};
UKG.SSC = UKG.SSC || {};

UKG.SSC.SimpleSizeCalculator = function() {
    var PROBABILITY_LEVEL_100 = 1;
    var PROBABILITY_LEVEL_128 = 1.28;
    var PROBABILITY_LEVEL_164 = 1.64;
    var PROBABILITY_LEVEL_196 = 1.96;
    var PROBABILITY_LEVEL_258 = 2.58;
    var PROBABILITY_LEVEL_300 = 3;

    var probability_levels = [
        PROBABILITY_LEVEL_100,
        PROBABILITY_LEVEL_128,
        PROBABILITY_LEVEL_164,
        PROBABILITY_LEVEL_196,
        PROBABILITY_LEVEL_258,
        PROBABILITY_LEVEL_300
    ];

    /**
     * Obtains the required population size for the sample.
     *
     * @param float k Probability level.
     * @param float D Level of accuracy required.
     * @param integer N Population size.
     * @param float P Percentage of the sample.
     * @return integer
     */
    this.getSampleSize = function(k, D, N, P) {
        
        var variance = this.variance(P);

        return (Math.pow(k, 2) * variance * N) / ((N * Math.pow(D, 2)) + (Math.pow(k, 2) * variance));
    }

    /**
     * Obtains the N Cluster size.
     *
     * @param float k Probability level.
     * @param float D Level of accuracy required.
     * @param float deff Design effect.
     * @param float P Percentage of the sample.
     * @return float
     */
    this.getNClusterSize = function(k, D, deff, P) {
        return this.n(k, D, P) * deff;
    }

    /**
     * Obtains the N1 Cluster size.
     *
     * @param float k Probability level.
     * @param float D Level of accuracy required.
     * @param integer N Population size.
     * @param float deff Design effect.
     * @param float P Percentage of the sample.
     * @return float
     */
    this.getN1ClusterSize = function(k, D, N, deff, P) {
        return this.getSampleSize(k, D, N, P) * deff;
    }

    /**
     * Obtains the N Rate Cluster size.
     *
     * @param float k Probability level.
     * @param float D Level of accuracy required.
     * @param float deff Design effect.
     * @param float RR Response rate.
     * @param float ER Eligibility rate.
     * @param float CR Coverage rate.
     * @param float P Percentage of the sample.
     * @return float
     */
    this.getNRateClusterSize = function(k, D, deff, RR, ER, CR, P) {
        return this.getNClusterSize(k, D, deff, P) / (RR * ER * CR);
    }

    /**
     * Obtains the N1 Rate Cluster size.
     *
     * @param float k Probability level.
     * @param float D Level of accuracy required.
     * @param integer N Population size.
     * @param float deff Design effect.
     * @param float RR Response rate.
     * @param float ER Eligibility rate.
     * @param float CR Coverage rate.
     * @param float P Percentage of the sample.
     * @returns float
     */
    this.getN1RateClusterSize = function(k, D, N, deff, RR, ER, CR, P) {
        return this.getN1ClusterSize(k, D, N, deff, P) / (RR * ER * CR);
    }

    /**
     * Obtains the n used for other calculations..
     *
     * @param float k Probability level.
     * @param float D Level of accuracy required.
     * @param float P Affirmative probability
     * @return float
     */
    this.n = function(k, D, P) {
        return (Math.pow(k, 2) * this.variance(P)) / Math.pow(D, 2);
    }

    /**
     * Obtains the variance.
     *
     * @param float P Affirmative probability
     * @return float
     */
    this.variance = function(P) {
        return P * (1 - P);
    }

    /**
     * Obtains de Design Effect.
     *
     * @param float rho Intracluster correlation.
     * @param float b Number of interviews within cluster.
     * @return float
     */
    this.deff = function(rho, b) {
        return 1 + (rho * (b - 1));
    }
}
