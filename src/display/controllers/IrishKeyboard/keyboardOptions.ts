const keyboardOptions = {
  layout: {
    default: [
      '{fada} a e i o u',
      '{urú} b c d f g p t',
      '{séimhiú} n m s r l h',
      '{hint} {space} {bksp} {enter}',
    ],
    fada: [
      '{fada} á é í ó ú',
      '{urú} b c d f g p t',
      '{séimhiú} n m s r l h',
      '{hint} {space} {bksp} {enter}',
    ],
    urú: [
      '{fada} a e i o u',
      '{urú} mb gc nd bhf ng bp dt',
      '{séimhiú} n m s r l h',
      '{hint} {space} {bksp} {enter}',
    ],
    séimhiú: [
      '{fada} a e i o u',
      '{urú} bh ch dh fh gh bh th',
      '{séimhiú} n mh sh r l h',
      '{hint} {space} {bksp} {enter}',
    ],
  },
  display: {
    '{bksp}': 'scrios',
    '{enter}': '&#9166;',
    '{space}': 'spás',
    '{urú}': 'urú',
    '{séimhiú}': 'séimhiú',
    '{shift}': 'caipitliú',
    '{fada}': 'fada',
    '{hint}': 'hint',
  },

  button: [
    {
      class: 'defaults',
      buttons:
        '{fada} a e i o u á é í ó ú {urú} b c d f g p t mb gc nd bhf ng bp dt {séimhiú} n m s r l h bh ch dh fh gh bh th mh sh {enter} {space} {bksp}',
    },
    {
      class: 'fadas',
      buttons: '{fada} á é í ó ú',
    },
    {
      class: 'urús',
      buttons: '{urú} mb gc nd bhf ng bp dt',
    },
    {
      class: 'séimhiús',
      buttons: '{séimhiú} bh ch dh fh gh bh th mh sh',
    },
    {
      class: 'blanks',
      buttons: ' ',
    },
  ],
};

export default keyboardOptions;
