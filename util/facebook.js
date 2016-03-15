var graph = require('fbgraph');

graph.setAccessToken('CAACEdEose0cBABQa1ISX6TyFqZBLAAArZA4RzhJ9lJYiLEuUmv4JIhrlZAaO6zmTrtWWNEze00bExfmVOyNYaAQzZAzHg2908BKekvRgJcnKiipf3wTu3o0KBgnwwwiuCelFg9qXS95ElEDZCrjGomVZAvfUITuWIAkv5l4xUXjchPulrWHGJsZBFL73cSK0ZAHbLGDaBH7NJAZDZD');

graph.get("/RoundRockPublicLibrary/events?fields=cover,description,start_time,end_time", function(err, res) {
  console.log(res);
});