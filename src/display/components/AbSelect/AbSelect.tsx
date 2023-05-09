import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

interface AbSelectProps {
  label: string;
  value: string;
  handleChange: (e: SelectChangeEvent<string | number>) => void;
  items: string[] | number[];
  all?: boolean;
  allDisplay?: string | null;
  lang?: string;
}

const englishTranslations: { [key: string]: string } = {
  abair: 'speak',
  beir: 'bring',
  clois: 'hear',
  faigh: 'get',
  feic: 'see',
  ith: 'eat',
  tabhair: 'give',
  tar: 'come',
  bí: 'be',
  téigh: 'go',
  déan: 'do/make',
  'aimsir chaite': 'past tense',
  'aimsir láithreach': 'present tense',
  'aimsir fháistineach': 'future tense',
  'modh coinníollach': 'conditional tense',
  'briathar saor': 'free verb',
  ceisteach: 'question',
  coibhneasta: 'relative clause',
  ráitis: 'statements',
  'ceisteanna breise': 'additional questions',
  spleách: 'dependent clause',
  diúltach: 'negative',
};

const AbSelect = ({
  label,
  value,
  handleChange,
  items,
  all = true,
  allDisplay = '',
  lang = 'ga',
}: AbSelectProps) => {
  return (
    <Select
      label={label}
      value={value}
      onChange={handleChange}
      sx={{ width: '100%', color: '#fff', textAlign: 'center' }}
    >
      {all && (
        <MenuItem key={'all'} value={'all'}>
          {allDisplay}
        </MenuItem>
      )}
      {items.map((item, i) => (
        <MenuItem key={i} value={item}>
          {lang === 'ga' ? item : item + ` (${englishTranslations[item]})`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AbSelect;
