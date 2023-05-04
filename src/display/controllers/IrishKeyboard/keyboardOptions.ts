const keyboardOptions = {
  layout: {
    default: [
      "- a e i o u '",
      'b c d f g p t',
      'n m s r l h',
      '{fada} {urú} {séimhiú} {space} {bksp}',
    ],
    fada: [
      "- á é í ó ú '",
      'b c d f g p t',
      'n m s r l h',
      '{fada} {urú} {séimhiú} {space} {bksp}',
    ],
    urú: [
      "- a e i o u '",
      'mb gc nd bhf ng bp dt',
      'n m s r l h',
      '{fada} {urú} {séimhiú} {space} {bksp}',
    ],
    séimhiú: [
      "- a e i o u '",
      'bh ch dh fh gh ph th',
      'n mh sh r l h',
      '{fada} {urú} {séimhiú} {space} {bksp}',
    ],
  },
  display: {
    '{bksp}': '&larr;',
    '{space}':
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    '{urú}': 'urú',
    '{séimhiú}': 'séimhiú',
    '{shift}': 'caipitliú',
    '{fada}': 'fada',
  },

  button: [
    {
      class: 'defaults',
      buttons:
        "{fada} a e i o u á é í ó ú ' - {urú} b c d f g p t mb gc nd bhf ng bp dt {séimhiú} n m s r l h bh ch dh fh gh ph th mh sh {space} {bksp}",
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
      buttons: '{séimhiú} bh ch dh fh gh ph th mh sh',
    },
    {
      class: 'delete',
      buttons: '{bksp}',
    },
  ],
};

export default keyboardOptions;
