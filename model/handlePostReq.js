var timeSeries = require('./timeseries');
var simple = require('./SimpleAnomalyDetector');
var hybrid = require('./HybridAnomalyDetector');

async function learnAndDetect(learnFile, detectFile, algoType) {
    let tsLearn = new timeSeries.TimeSeries(learnFile)
    let tsDetect = new timeSeries.TimeSeries(detectFile)
    let anomalyDetector
    if(algoType === "1")
        anomalyDetector = new hybrid.HybridAnomalyDetector()
    else if(algoType === "2")
        anomalyDetector = new simple.SimpleAnomalyDetector()
     else {
        throw new Error("no algoType");
    }
    try {
    await anomalyDetector.learnNormal(tsLearn)
    let anomalyList = await anomalyDetector.detect(tsDetect)
    return anomalyList
    } catch(error) {
         throw new Error(error)
    }
}

module.exports = { learnAndDetect };