exports.foo = bar => {
  return new Buffer("BAR:") + bar.toUpperCase()
};
