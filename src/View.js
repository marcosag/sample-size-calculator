var UKG = UKG || {};
UKG.SSC = UKG.SSC || {};

UKG.SSC.View = function() {
    this.run = function() {
        $('#sample_size_calculator').submit(function(e) {

            var calculator = new UKG.SSC.SimpleSizeCalculator();
            var size_k = $('#size_k').val();
            var size_D = $('#size_D').val();
            var size_N = $('#size_N').val();
            var deff = $('#size_deff').val();
            var size_RR = $('#size_RR').val();
            var size_ER = $('#size_ER').val();
            var size_CR = $('#size_CR').val();
            var size_P = $('#size_P').val();

            $('#sampling_size_result').val(Math.round(calculator.getSampleSize(size_k, size_D, size_N, size_P)));

            $('#cluster_size_result').val(Math.round(calculator.getN1ClusterSize(size_k, size_D, size_N, deff, size_P)));

            $('#cluster_rates_size_result').val(Math.round(calculator.getN1RateClusterSize(size_k, size_D, size_N, deff, size_RR, size_ER, size_CR, size_P) ));

            $('#calculation_btn')
                .attr('disabled', 'disabled')
                .removeClass('btn-primary')
                .data('clicked', true);

            return false;
        });

        $('#size_rho, #size_b').bind('keyup change', function(e){

            if(!$('#size_rho').get(0).checkValidity() || !$('#size_b').get(0).checkValidity()) {
                return;
            }

            var calculator = new UKG.SSC.SimpleSizeCalculator();
            var size_rho = $('#size_rho').val();
            var size_b = $('#size_b').val();

            $('#size_deff').val(calculator.deff(size_rho, size_b).toFixed(2));
        });

        $('#sample_size_calculator input, #sample_size_calculator select').bind('keyup change', function(e) {

            var code = e.keyCode || e.which;

            if (code  == 13) {
                e.preventDefault();
                return false;
            }

            if(!$('#calculation_btn').data('clicked')) {
                return;
            }

            $('#calculation_btn')
                .removeAttr('disabled')
                .addClass('btn-primary')
                .text('Recalculate');
        });

        $("#sample_size_calculator .fa-info-circle").click(function(){
            var elem = $(this).attr('href');

            $(".definitions-block .definition").removeClass('active');
            $(elem).parent().addClass('active');
        });
    }
}
