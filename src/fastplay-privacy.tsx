import { mountPage } from './lib/mountPage.tsx';
import { FastPlayPrivacy } from './FastPlayPrivacy.tsx';
import './index.css';
import './fastcast-v2.css';
import './fastcast-privacy.css';
import './fastplay-privacy.css';

export function Page() {
  return <FastPlayPrivacy />;
}

mountPage(<Page />);
