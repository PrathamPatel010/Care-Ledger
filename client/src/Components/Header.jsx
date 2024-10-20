import PropTypes from 'prop-types';
const Header = ({account,isOwner}) => {
  return (
    <div className="flex flex-col items-center space-y-3">
          <h1 className="text-green-400 text-4xl">CareLedger</h1>
          {account && (
            <div className="text-2xl">Account connected: {account}</div>
          )}
          {isOwner && <p className="text-2xl">You are the contract owner</p>}
    </div>
  )
}

Header.propTypes = {
  account: PropTypes.string,
  isOwner: PropTypes.bool
}

export default Header;