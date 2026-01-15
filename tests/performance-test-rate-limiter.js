import http from 'k6/http';
import { check, sleep } from 'k6';

const tokens = [
  '5b4dc887-d19f-40ac-9bcd-6b27426b0c84', 
  'a46ee8c7-c7d9-4d2a-a211-460e7e86fac2',
  'e293cf42-f1f6-11f0-a582-0242ac170002', // user_1
  'e293d5da-f1f6-11f0-a582-0242ac170002', // user_10
  'e2949f4d-f1f6-11f0-a582-0242ac170002', // user_100
  'e293d633-f1f6-11f0-a582-0242ac170002', // user_11
  'e293d683-f1f6-11f0-a582-0242ac170002', // user_12
  'e293d6d6-f1f6-11f0-a582-0242ac170002', // user_13
  'e293d732-f1f6-11f0-a582-0242ac170002', // user_14
  'e293d78b-f1f6-11f0-a582-0242ac170002', // user_15
  'e293d7e8-f1f6-11f0-a582-0242ac170002', // user_16
  'e293d848-f1f6-11f0-a582-0242ac170002', // user_17
  'e293d8a3-f1f6-11f0-a582-0242ac170002', // user_18
  'e293d8f6-f1f6-11f0-a582-0242ac170002', // user_19
  'e293d2a5-f1f6-11f0-a582-0242ac170002', // user_2
  'e293d94d-f1f6-11f0-a582-0242ac170002', // user_20
  'e293d9a3-f1f6-11f0-a582-0242ac170002', // user_21
  'e293da40-f1f6-11f0-a582-0242ac170002', // user_22
  'e293dade-f1f6-11f0-a582-0242ac170002', // user_23
  'e293db7c-f1f6-11f0-a582-0242ac170002', // user_24
  'e293dbde-f1f6-11f0-a582-0242ac170002', // user_25
  'e293dc32-f1f6-11f0-a582-0242ac170002', // user_26
  'e293dc87-f1f6-11f0-a582-0242ac170002', // user_27
  'e293dcd6-f1f6-11f0-a582-0242ac170002', // user_28
  'e293dd2d-f1f6-11f0-a582-0242ac170002', // user_29
  'e293d366-f1f6-11f0-a582-0242ac170002', // user_3
  'e293dd7f-f1f6-11f0-a582-0242ac170002', // user_30
  'e293dded-f1f6-11f0-a582-0242ac170002', // user_31
  'e293de3d-f1f6-11f0-a582-0242ac170002', // user_32
  'e293dea4-f1f6-11f0-a582-0242ac170002', // user_33
  'e293df27-f1f6-11f0-a582-0242ac170002', // user_34
  'e293dfa4-f1f6-11f0-a582-0242ac170002', // user_35
  'e293e027-f1f6-11f0-a582-0242ac170002', // user_36
  'e293e0ba-f1f6-11f0-a582-0242ac170002', // user_37
  'e293e14c-f1f6-11f0-a582-0242ac170002', // user_38
  'e293e1b8-f1f6-11f0-a582-0242ac170002', // user_39
  'e293d3c5-f1f6-11f0-a582-0242ac170002', // user_4
  'e293e20e-f1f6-11f0-a582-0242ac170002', // user_40
  'e293e26a-f1f6-11f0-a582-0242ac170002', // user_41
  'e293e2c7-f1f6-11f0-a582-0242ac170002', // user_42
  'e293e31c-f1f6-11f0-a582-0242ac170002', // user_43
  'e293e379-f1f6-11f0-a582-0242ac170002', // user_44
  'e293e3ce-f1f6-11f0-a582-0242ac170002', // user_45
  'e293e424-f1f6-11f0-a582-0242ac170002', // user_46
  'e293e473-f1f6-11f0-a582-0242ac170002', // user_47
  'e293e4ca-f1f6-11f0-a582-0242ac170002', // user_48
  'e293e517-f1f6-11f0-a582-0242ac170002', // user_49
  'e293d41b-f1f6-11f0-a582-0242ac170002', // user_5
  'e293e570-f1f6-11f0-a582-0242ac170002', // user_50
  'e293e5c5-f1f6-11f0-a582-0242ac170002', // user_51
  'e293e61f-f1f6-11f0-a582-0242ac170002', // user_52
  'e293e66c-f1f6-11f0-a582-0242ac170002', // user_53
  'e293e6db-f1f6-11f0-a582-0242ac170002', // user_54
  'e293e78f-f1f6-11f0-a582-0242ac170002', // user_55
  'e293e82f-f1f6-11f0-a582-0242ac170002', // user_56
  'e293e891-f1f6-11f0-a582-0242ac170002', // user_57
  'e293e8eb-f1f6-11f0-a582-0242ac170002', // user_58
  'e293e99a-f1f6-11f0-a582-0242ac170002', // user_59
  'e293d475-f1f6-11f0-a582-0242ac170002', // user_6
  'e293e9f9-f1f6-11f0-a582-0242ac170002', // user_60
  'e293ea65-f1f6-11f0-a582-0242ac170002', // user_61
  'e293eac9-f1f6-11f0-a582-0242ac170002', // user_62
  'e293eb29-f1f6-11f0-a582-0242ac170002', // user_63
  'e293eb89-f1f6-11f0-a582-0242ac170002', // user_64
  'e293ebf0-f1f6-11f0-a582-0242ac170002', // user_65
  'e293ec4e-f1f6-11f0-a582-0242ac170002', // user_66
  'e293ecb3-f1f6-11f0-a582-0242ac170002', // user_67
  'e293ed0e-f1f6-11f0-a582-0242ac170002', // user_68
  'e293ed6f-f1f6-11f0-a582-0242ac170002', // user_69
  'e293d4ca-f1f6-11f0-a582-0242ac170002', // user_7
  'e293edca-f1f6-11f0-a582-0242ac170002', // user_70
  'e293ee30-f1f6-11f0-a582-0242ac170002', // user_71
  'e293ee9d-f1f6-11f0-a582-0242ac170002', // user_72
  'e293ef03-f1f6-11f0-a582-0242ac170002', // user_73
  'e293ef67-f1f6-11f0-a582-0242ac170002', // user_74
  'e293efd1-f1f6-11f0-a582-0242ac170002', // user_75
  'e293f02b-f1f6-11f0-a582-0242ac170002', // user_76
  'e293f08d-f1f6-11f0-a582-0242ac170002', // user_77
  'e293f0e7-f1f6-11f0-a582-0242ac170002', // user_78
  'e293f146-f1f6-11f0-a582-0242ac170002', // user_79
  'e293d522-f1f6-11f0-a582-0242ac170002', // user_8
  'e293f19f-f1f6-11f0-a582-0242ac170002', // user_80
  'e293f20f-f1f6-11f0-a582-0242ac170002', // user_81
  'e293f276-f1f6-11f0-a582-0242ac170002', // user_82
  'e293f2e7-f1f6-11f0-a582-0242ac170002', // user_83
  'e293f34b-f1f6-11f0-a582-0242ac170002', // user_84
  'e293f3b8-f1f6-11f0-a582-0242ac170002', // user_85
  'e293f442-f1f6-11f0-a582-0242ac170002', // user_86
  'e293f4e4-f1f6-11f0-a582-0242ac170002', // user_87
  'e293f5ad-f1f6-11f0-a582-0242ac170002', // user_88
  'e293f64a-f1f6-11f0-a582-0242ac170002', // user_89
  'e293d572-f1f6-11f0-a582-0242ac170002', // user_9
  'e293f70a-f1f6-11f0-a582-0242ac170002', // user_90
  'e293f7d9-f1f6-11f0-a582-0242ac170002', // user_91
  'e293f8a3-f1f6-11f0-a582-0242ac170002', // user_92
  'e293f95b-f1f6-11f0-a582-0242ac170002', // user_93
  'e293fa14-f1f6-11f0-a582-0242ac170002', // user_94
  'e293fae0-f1f6-11f0-a582-0242ac170002', // user_95
  'e293fb9f-f1f6-11f0-a582-0242ac170002', // user_96
  'e2949d46-f1f6-11f0-a582-0242ac170002', // user_97
  'e2949e4e-f1f6-11f0-a582-0242ac170002', // user_98
  'e2949ecf-f1f6-11f0-a582-0242ac170002'  // user_99
];

export const options = {
  vus: 100,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.55'],   
    'checks{check_name:Success Request}': ['rate>0.45'], 
    'checks{check_name:Rate Limited Request}': ['rate>0.45'], 
  },
};

export default function () {
  const vuId = __VU - 1;
  const token = tokens[vuId % tokens.length]; 

  const headers = {
    'Accept': 'application/json',
    'Authorization': token,
  };

  const url = 'http://localhost:3000/api/users/current';

  const responses = http.batch([
    ['GET', url, null, { headers: headers }],
    ['GET', url, null, { headers: headers }],
    ['GET', url, null, { headers: headers }],
    ['GET', url, null, { headers: headers }],
  ]);

  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];

    check(response, {
      'Success Request': (r) => r.status === 200,
      'Rate Limited Request': (r) => r.status === 429,
      'Response time < 2000ms': (r) => r.timings.duration < 2000,
    });
  }

  sleep(1);
}

export function setup() {
  return {};
}

export function teardown(data) {
}