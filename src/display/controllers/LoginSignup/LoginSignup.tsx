/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';

const LoginSignup = () => {
  const { t } = useTranslation();
  const callbackUrl = encodeURIComponent(
    `${window.location.protocol}//${window.location.host}/auth/callback`,
  );
  const authCallback = `${import.meta.env.VITE_PUBLIC_AUTH_URL}?ref=${callbackUrl}`;
  return (
    <BatBox>
      <Box>
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label={t('buttons.loginSignup')}
            onClick={() => {
              window.location.href = authCallback;
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
