const restrict_ips = (ip) => {
  const allowed_ips = ["::1", "::ffff:10.1.38.116"];
  return allowed_ips.includes(ip);
};

module.exports = { restrict_ips };
