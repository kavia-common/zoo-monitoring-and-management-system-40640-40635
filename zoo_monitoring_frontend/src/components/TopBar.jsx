import Breadcrumbs from './Breadcrumbs';
import DateRangePicker from './DateRangePicker';
import UserMenu from './UserMenu';

// PUBLIC_INTERFACE
export default function TopBar() {
  return (
    <>
      <div className="brand" aria-label="VizAI brand">
        <span className="dot" />
        <span>VizAI</span>
      </div>
      <div className="spacer" />
      <div className="row" style={{ gap: 16 }}>
        <Breadcrumbs />
        <DateRangePicker />
        <UserMenu />
      </div>
    </>
  );
}
