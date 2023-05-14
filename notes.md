"0,1,6,10,9,4,2,8,3,11,5,7": Object { start: (12) […], targets: (3) […], done: [] }
​​
done: Array []
​​
start: Array(12) [ 0, 1, 6, … ]
​​
targets: Array(3) [ 1, 6, 0 ]


"rawNumbers": [
    0,
    5,
    1,
    4,
    2,
    3,
    6,
    11,
    7,
    10,
    8,
    9
  ],
  "miString": "IMMMIMMIMMMMIMIMMIMIMMMMIMMM",
  "name": "I3MI2MI4MIMI2MIMI4MI3M",
  "altMiString": "IMIMMMMMMMMIMMMIMMMMMMIMMMMIMMMMMMMMI",
  "altName": "IMI8MI3MI6MI4MI8MI"

inverse
  "altMiString": "IMIMMIMMMMMMMIMMMMMIMMMMMMMMIMMI",
  "altName": "IMI2MI7MI5MI8MI2MI"



  "rawNumbers": [
    5,
    4,
    3,
    2,
    1,
    0,
    11,
    10,
    9,
    8,
    7,
    6
  ],
  "miString": "IMIMMMMMMMMMM",
  "name": "IMI10M",



------------------------------------------------------



{
  "rawNumbers": [
    0,
    1,
    4,
    6,
    7,
    10,
    8,
    11,
    9,
    2,
    5,
    3
  ],
  "miString": "MMMIMMIMMMMMMIMIMMMIMIM",
  "name": "3MI2MI6MIMI3MIMIM",
  "cycles": [
    [
      0
    ],
    [
      1
    ],
    [
      2,
      4,
      7,
      11,
      3,
      6,
      8,
      9
    ],
    [
      5,
      10
    ]
  ],
  "maxLengthCycle": 8,
  "invariants": [
    0,
    1
  ],
  "inverse": [
    0,
    1,
    9,
    11,
    2,
    10,
    3,
    4,
    6,
    8,
    5,
    7
  ],
  "altMiString": "IMMMMMMMMMMIMMMMIMMMMMMM",
  "altName": "I10MI4MI7M"
}

0,10,4 finira par amener 3 en 3e position sauf s'il est 6e ou 11e
dans ce dernier cas IMI, puis -> 1,0,...

{
  "rawNumbers": [
    0,
    1,
    2,
    7,
    5,
    9,
    10,
    8,
    3,
    4,
    11,
    6
  ],
  "miString": "MMMIMIMMMIMMMMM",
  "name": "3MIMI3MI5M",
  "cycles": [
    [
      0
    ],
    [
      1
    ],
    [
      2
    ],
    [
      3,
      7,
      8
    ],
    [
      4,
      5,
      9
    ],
    [
      6,
      10,
      11
    ]
  ],
  "maxLengthCycle": 3,
  "invariants": [
    0,
    1,
    2
  ],
  "inverse": [
    0,
    1,
    2,
    8,
    9,
    4,
    11,
    3,
    7,
    5,
    6,
    10
  ],
  "altMiString": "MMMIMIMMMIMMMMM",
  "altName": "3MIMI3MI5M"
}

3,1,3 si 4 est 8e ou 9e

{
  "rawNumbers": [
    0,
    1,
    2,
    4,
    11,
    6,
    7,
    5,
    9,
    10,
    8,
    3
  ],
  "miString": "IMIMIMMIMIMMIMIM",
  "name": "IMIMI2MIMI2MIMIM",
  "cycles": [
    [
      0
    ],
    [
      1
    ],
    [
      2
    ],
    [
      3,
      4,
      11
    ],
    [
      5,
      6,
      7
    ],
    [
      8,
      9,
      10
    ]
  ],
  "maxLengthCycle": 3,
  "invariants": [
    0,
    1,
    2
  ],
  "inverse": [
    0,
    1,
    2,
    11,
    3,
    7,
    5,
    6,
    10,
    8,
    9,
    4
  ],
  "altMiString": "IMMIMMMMIMMMMMMIMMMMMIMMMMMMMMM",
  "altName": "I2MI4MI6MI5MI9M"
}

0,2,4,6,5 pour amener 4 en 4e, 8e ou 9e


{
  "rawNumbers": [
    0,
    1,
    2,
    3,
    10,
    4,
    8,
    6,
    9,
    7,
    11,
    5
  ],
  "miString": "MIMMMIMMIMMMIMMIMIMIMI",
  "name": "MI3MI2MI3MI2MIMIMIMI",
  "cycles": [
    [
      0
    ],
    [
      1
    ],
    [
      2
    ],
    [
      3
    ],
    [
      4,
      10,
      11,
      5
    ],
    [
      6,
      8,
      9,
      7
    ]
  ],
  "maxLengthCycle": 4,
  "invariants": [
    0,
    1,
    2,
    3
  ],
  "inverse": [
    0,
    1,
    2,
    3,
    5,
    11,
    7,
    9,
    6,
    8,
    4,
    10
  ],
  "altMiString": "MMMMMMIMMMIMMMMMMIMMMM",
  "altName": "6MI3MI6MI4M"
}

6,3,6
ou
10,4,2 pour amener 5 en 5e

{
  "rawNumbers": [
    0,
    1,
    2,
    3,
    9,
    7,
    4,
    10,
    5,
    11,
    8,
    6
  ],
  "miString": "MIMMMMIMMMIMMMMIMMMIM",
  "name": "MI4MI3MI4MI3MIM",
  "cycles": [
    [
      0
    ],
    [
      1
    ],
    [
      2
    ],
    [
      3
    ],
    [
      4,
      9,
      11,
      6
    ],
    [
      5,
      7,
      10,
      8
    ]
  ],
  "maxLengthCycle": 4,
  "invariants": [
    0,
    1,
    2,
    3
  ],
  "inverse": [
    0,
    1,
    2,
    3,
    6,
    8,
    11,
    5,
    10,
    4,
    7,
    9
  ],
  "altMiString": "MMMMMMMMMMIMMMMIMMIMMMMMM",
  "altName": "10MI4MI2MI6M"
}


