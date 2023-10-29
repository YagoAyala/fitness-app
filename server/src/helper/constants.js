"use strict";

var CONST = {
  Filter: {
    Property: "property",
    Operator: "operator",
    Operators: {
      Equal: "=",
      LessThan: "<",
      LessThanEqual: "<=",
      GreaterThan: ">",
      GreaterThanEqual: ">=",
      In: "IN",
    },
    Value: "value"
  },
  ErrorSeverity: {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    URGENT: "URGENT"
  },
};

Object.freeze(CONST);

module.exports = CONST;