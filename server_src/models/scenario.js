var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScenarioSchema = new Schema({
    name: {type: String, index: { unique: true }},
    terminationconditions: [{type: String}],
    revision: Number,
    fragments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fragment'}],
    domainmodel: {type: mongoose.Schema.Types.ObjectId, ref: 'DomainModel'},
    startconditions: [{
        query: String,
        dataclasses: [{
            classname: String,
            state: String,
            mapping :[{
                path: String,
                attr: String
            }]
        }]
    }]
});

module.exports = {
    schema: ScenarioSchema,
    model: mongoose.model('Scenario', ScenarioSchema)
};