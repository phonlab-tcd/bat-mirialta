/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';

import { AbButton } from 'abair-components';

import { domain } from '@/config';
import BatBox from '@/display/components/BatBox';

const LoginSignup = () => {
  const { t } = useTranslation();

  return (
    <BatBox>
      <Box>
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label={t('buttons.loginSignup')}
            onClick={() => {
              window.location.href = `${domain}/login?origin=applications/bat-mirialta`;
            }}
            selected={true}
            color="secondary"
          />
        </BatBox>
      </Box>
    </BatBox>
  );
};

export default LoginSignup;
