const mongoose = require('mongoose');

const attributeRuleSchema = new mongoose.schema({
  categoryName:{
    type: String,
    required: true,
    unique: true
  },
  requiredAttrs:[{
    type: String
  }],
  optionalAttrs:[{
    type: String
  }],
  createdAt:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AttributeRule', attributeRuleSchema);