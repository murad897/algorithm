const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
a.reduce((item) => item);
const c = [
  { name: "Roma" },
  { name: "Alex" },
  { name: "Denis" },
  { name: "Ioseb" },
];
const s = c.sort();
const d = { name: 11111 };
// console.log(d, "21212");
const b = d;
b.name = "33333";
// console.log("Start");
const ex1 = () => ({ a: 13 });
const ex2 = () => [1, 2, 3, 4, 5, "a,,,,,,", 2, 2, 2];
const ex3 = () => [...ex2()];
const ex4 = new Set([1, 2, 3, 4]);
const hardStructure = [
  {
    a: 1,
    b: "2",
    c: [
      {
        a: "123",
        b: "@333z$34",
        c: "122,333,4444,5555",
        z: ex4,
        d: [
          [
            123,
            1,
            "1111",
            23323,
            1.222,
            55,
            [1212, 1212, 1212],
            {
              a: 111,
              b: null,
              c: () => 111,
              d: 22,
              e: "e",
              f: () => "fffqqq",
            },
          ],
          [
            2212,
            1,
            "111211",
            23,
            1.21,
            22,
            [33, 3, 3],
            {
              a: 3,
              b: null,
              c: () => 11221,
              d: 2112,
              e: "e11",
              f: () => "fffqqq",
              g: 2,
            },
          ],
          [
            11,
            22,
            "dsds",
            {
              a: {
                b: {
                  c: {
                    d: {
                      a: 1,
                      b: [ex1()],
                      c: {
                        a: {
                          b: {
                            c: {
                              d: {
                                a: new Map([
                                  ["a2134", 2123124],
                                  ["b", 3],
                                  ["c", 3],
                                ]),
                                b: ex2,
                                c: [...ex3(), "1", 1],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        ],
      },
    ],
  },
  {
    d: [
      [
        123,
        1,
        "1111",
        23323,
        1.222,
        55,
        [121322332, 12132322, 12323212],
        {
          a: 111,
          b: null,
          c: () => 1123231,
          d: 22,
          e: "e",
          f: () => "fffqqq",
        },
      ],
      [
        2212,
        1,
        "111211",
        23,
        1.21,
        22,
        [33, 3, 3],
        {
          a: 3,
          b: null,
          c: () => 1123221,
          d: 211,
          e: "e1231",
          f: () => "fffqq1232312123q",
          g: 2123,
        },
      ],
      [
        11,
        22,
        "dsds",
        {
          a: {
            b: {
              c: {
                d: {
                  a: 1,
                  b: [ex1()],
                  c: {
                    a: {
                      b: {
                        c: {
                          d: {
                            a: new Map([
                              [true, 222312],
                              [2, 322],
                              ["c2", 32],
                              [() => {}, 32],
                            ]),
                            b: ex2,
                            c: [...ex3(), "1121123", 1],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    ],
  },
  {
    a: {
      b: {
        c: {
          d: {
            a: 112312,
            b: [1],
            c: {
              a: {
                b: {
                  c: {
                    d: {
                      a: "",
                      b: "",
                      c: "",
                      v: "v12312323",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];

const allValues = [];
const numbersArray = [];
const initialValue = 0;
let sumWithInitial;

const memoize = (func) => {
  const results = {};
  return (...args) => {
    if (!results[args]) {
      results[args] = func(...args);
    }
    return results[args];
  };
};

const getFiniteValue = (obj) => {
  const getProp = memoize((o) => {
    for (let prop in o) {
      if (typeof o[prop] === "object") {
        getProp(o[prop]);
      }
      if (o[prop] instanceof Set) {
        o[prop].forEach((element) => allValues.push(element));
      }
      if (o[prop] instanceof Map) {
        const valuesOfMap = [...o[prop].values()];
        valuesOfMap.forEach((value) => {
          allValues.push(value);
        });
      } else {
        allValues.push(o[prop]);
      }
    }
  });

  getProp(obj);

  allValues.forEach((item) => {
    if (typeof item === "number") {
      numbersArray.push(parseInt(item));
    } else if (typeof item === "string" && item.length > 0) {
      let hasNumber = /\d/;
      if (hasNumber.test(item)) {
        let reg = /\d+/g;
        let result = item.match(reg);
        result.map((stringNumber) => {
          let numberedItem = parseInt(stringNumber);
          numbersArray.push(numberedItem);
        });
      }
    }
  });

  sumWithInitial = numbersArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  console.log(numbersArray);
};

console.log(hardStructure);
getFiniteValue(hardStructure);
console.log(sumWithInitial);
