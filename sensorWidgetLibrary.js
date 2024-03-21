// sensorWidgetLibrary.js
(function(window){
    function setupSensorWidget(sensorParams, rpcMethod, widgetContext) {
        // Populate the dropdown with sensor types
        function populateDropdown() {
            var dropdown = $('#sensorTypeDropdown');
            Object.keys(sensorParams).forEach(function(sensorType) {
                dropdown.append($('<option>', {
                    value: sensorType,
                    text: sensorType
                }));
            });
        }

        // Call populateDropdown when widget is initialized
        populateDropdown();

        // Define the sendCommand function using the passed parameters
        widgetContext.sendCommand = function() {
            var selectedSensor = $('#sensorTypeDropdown').val();
            var params = {
                method: rpcMethod,
                params: sensorParams[selectedSensor]
            };
            // Use self.ctx.controlApi to send the RPC command
            // Ensure self.ctx is available in this context
            if (self.ctx && self.ctx.controlApi) {
                self.ctx.controlApi.sendOneWayCommand(params.method, JSON.stringify(params.params), 5000).subscribe(
                    function () {
                        console.log('RPC call sent successfully');
                    },
                    function (error) {
                        console.error('RPC call failed:', error);
                    }
                );
            } else {
                console.error('Widget context (self.ctx) is not available.');
            }

        };

        // ... Other shared setup code ...
    }

    // Expose the setupSensorWidget function to the global window object
    window.setupSensorWidget = setupSensorWidget;
}(window));
