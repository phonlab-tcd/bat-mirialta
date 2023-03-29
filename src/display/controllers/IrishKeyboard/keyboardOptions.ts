const keyboardOptions = {
  layout: {
    default: ['{fada} a e i o u {bksp}', '{urú} b c d f g p t', '{séimhiú} n m s r l h {space}'],
    fada: ['{fada} á é í ó ú {bksp}', '{urú} b c d f g p t', '{séimhiú} n m s r l h {space}'],
    urú: [
      '{fada} a e i o u {bksp}',
      '{urú} mb gc nd bhf ng bp dt',
      '{séimhiú} n m s r l h {space}',
    ],
    séimhiú: [
      '{fada} a e i o u {bksp}',
      '{urú} bh ch dh fh gh bh th',
      '{séimhiú} n mh sh r l h {space}',
    ],
  },
  display: {
    '{bksp}': 'scrios',
    '{space}': 'spás',
    '{urú}': 'urú',
    '{séimhiú}': 'séimhiú',
    '{shift}': 'caipitliú',
    '{fada}': 'fada',
  },

  button: [
    {
      class: 'defaults',
      buttons:
        '{fada} a e i o u á é í ó ú {urú} b c d f g p t mb gc nd bhf ng bp dt {séimhiú} n m s r l h bh ch dh fh gh bh th mh sh {space} {bksp}',
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
      class: 'delete',
      buttons: '{bksp}',
    },
  ],
};

export default keyboardOptions;
