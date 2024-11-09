const mongoose = require('mongoose');

const attributeRuleSchema = new mongoose.Schema({
  categoryName:{
    type: String,
    required: true,
    unique: true
  },
  requiredAttributes:[{
    type: String
  }],
  optionalAttributes:[{
    type: String
  }],
  createdAt:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AttributeRule', attributeRuleSchema);