// sensorWidgetLibrary.js
(function(window){
    function setupSensorWidget(sensorParams, rpcMethod, widgetContext) {
        // Define the sendCommand function using the passed parameters
        widgetContext.sendCommand = function() {
            var selectedSensor = $('#sensorTypeDropdown').val();
            var params = {
                method: rpcMethod,
                params: sensorParams[selectedSensor]
            };

            if (widgetContext.ctx && widgetContext.ctx.controlApi) {
                widgetContext.ctx.controlApi.sendOneWayCommand(params.method, params.params, 5000).subscribe(
                    function () { console.log('RPC call sent successfully'); },
                    function (error) { console.error('RPC call failed:', error); }
                );
            } else {
                console.error('Widget context (widgetContext.ctx) is not available.');
            }
        };

        // ... Other shared setup code ...
    }

    // Expose the setup function to the global window object
    window.setupSensorWidget = setupSensorWidget;
}(window));
