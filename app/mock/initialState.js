export default {
  route: {
    location: {
      pathname: '/ladders',
      search: '',
      hash: '',
      key: 'fw5h19',
    },
  },
  language: {
    locale: 'en',
  },
  app: {
    alertMessage: false,
    ladders: [
      {
        ladderName: 'Pineapple cup',
        players: [
          {
            name: 'bob',
            description: 'sponge',
          },
          {
            name: 'patric',
            description: 'star fish',
          },
          {
            name: 'squidverd',
            description: 'squid',
          },
          {
            name: 'crusty',
            description: 'crab',
          },
        ],
        matches: [
          {
            matchIndex: 0,
            player1: 'bob',
            player2: 'patric',
            matchTime: 1529076873866,
            location: 'town',
            result: 'patric',
          },
          {
            matchIndex: 1,
            player1: 'squidverd',
            player2: 'crusty',
            matchTime: 1529076896212,
            location: 'sea',
            result: 'squidverd',
          },
          {
            matchIndex: 2,
            player1: 'patric',
            player2: 'squidverd',
            matchTime: 1529076939720,
            location: 'road',
            result: 'draw',
          },
          {
            matchIndex: 3,
            player1: 'crusty',
            player2: 'patric',
            matchTime: 1529076981772,
            location: 'land',
            result: '',
          },
        ],
      },
    ],
    addLadder: {
      ladderName: false,
      players: [],
      matches: [],
    },
  },
  // ladderDetail: {
  //   ladderIndex: false,
  //   playerRanking: [],
  //   showAddMatchDialog: false,
  // },
};
