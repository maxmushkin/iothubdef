module.exports = function (context, IoTHubMessages) {
    context.log(`Data Enrichment Function is executed with ${IoTHubMessages.length + 1} items`);

    IoTHubMessages.map(x => Object.assign(x, context.bindings.refData.find(y => y.DeviceId = x.name)));
    var enrichedData = JSON.stringify(IoTHubMessages);

    context.log("Enriched Data: " + enrichedData);

    context.bindings.enrichedData = enrichedData;
    
    if(null == context.bindings.inblob || 'undefined' === context.bindings.inblob)
    {
        context.log("inblob is undefined");
        context.bindings.outblob = enrichedData;
    }
    else
    {
        context.log("inblob already exists");
        context.bindings.outblob = context.bindings.inblob + '\n' + enrichedData;
    }

    context.done();
};