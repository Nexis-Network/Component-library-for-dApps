import Identicon from "@polkadot/react-identicon";
import { formatAddress } from "../../../utils/format";
import CopyButton from "../CopyButton";
import Button from "../../atoms/Button";
import QRCode from "../../atoms/QRCode";
import { localizedStrings } from "../../../l10n/l10n";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import DropdownItem from "../../atoms/Dropdown/DropdownItem";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Input from "../../atoms/Input";
import Form from "../../atoms/Form";
import Text from "../../atoms/Text";
import * as util from '@reef-chain/util-lib';

export interface Props {
  name?: string;
  address: string;
  evmAddress?: string;
  source?: string;
  isSelected?: boolean;
  showOptions?: boolean;
  onSelect?: (...args: any[]) => any;
  onRename?: (newName: string) => any;
  onExport?: (password: string) => any;
  onForget?: () => any;
  className?: string;
  isEvmClaimed?: boolean;
}

const Account = ({
  name,
  address,
  evmAddress,
  source,
  isSelected,
  isEvmClaimed,
  showOptions,
  onSelect,
  onRename,
  onExport,
  onForget,
  className,
}: Props): JSX.Element => {
  const [isOptionsDropdownOpen, setOptionsDropdown] = useState(false);
  const [isExportDropdownOpen, setExportDropdown] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isEditingName, setEditingName] = useState(false);
  const [password, setPassword] = useState("");
  const [submittedWithError, setSubmittedWithError] = useState(false);

  const openExportDropdown = () => {
    setExportDropdown(true);
    setOptionsDropdown(false);
  }

  const closeExportDropdown = () => {
    setExportDropdown(false);
    setPassword("");
  }

  const onExportClick = () => {
    if (!password.length) {
      setSubmittedWithError(true);
      return;
    }

    onExport(password);
    closeExportDropdown();
  };
  return (
    <div
      className={`
      uik-account-selector-account
      ${isSelected ? "uik-account-selector-account--selected" : ""}
      ${className || ""}
    `}
    >
      <Identicon
        value={address}
        className="uik-account-selector-account__identicon"
        size={86}
      />

      <div className="uik-account-selector-account__info">
        <div className="uik-account-selector-account__name">
          {isEditingName ? (
            <Input
              value={newName}
              onInput={(e) => setNewName(e.target.value)}
              onBlur={() => {
                if (newName.length < 3) return;
                setEditingName(false);
                onRename && onRename(newName);
              }}
              error={
                newName.length < 3
                  ? localizedStrings.error_short_name
                  : undefined
              }
            />
          ) : (
            <span>{newName}</span>
          )}
          {!!source && source !== "reef" && (
            <span className="uik-account-selector-account__source">
              {source}
            </span>
          )}
        </div>

        <div className="uik-account-selector-account__address">
          <div>
            {localizedStrings.native_address}: {formatAddress(address)}
          </div>
          <CopyButton
            value={address}
            tooltip={localizedStrings.copy_reef_address}
            notification={localizedStrings.copied_reef_address}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

      {
        !!evmAddress && isEvmClaimed!==false &&
        <div className='uik-account-selector-account__address'>
          <div>{localizedStrings.reef_evm_address}: { formatAddress(evmAddress) }</div>
          <CopyButton
            value={util.addressUtils.addReefSpecificStringFromAddress(evmAddress)}
            tooltip={localizedStrings.copy_reef_evm}
            notification={{
              keepAlive: true,
              type: "danger",
              message:localizedStrings.copied_reef_address,
              children: <Button text={localizedStrings.i_understand}/>
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      }

        <a
          className="uik-account-selector-account__open-btn"
          href={`https://reefscan.com/account/${address}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {localizedStrings.open_in_explorer}
        </a>
      </div>

      <div className="uik-account-selector__select_btn">
        <Button
          fill
          text={localizedStrings.select}
          size="large"
          onClick={onSelect}
          disabled={isSelected}
        />
      </div>
      <button type="button" className="uik-account-selector-account__qr-code">
        <QRCode value={address} />
      </button>

      {!!showOptions && (onRename || onExport || onForget) && (
        <div className="uik-account-selector__options">
          <Button
            icon={faEllipsisV}
            size="small"
            onClick={() => setOptionsDropdown(true)}
          />
          <Dropdown
            isOpen={isOptionsDropdownOpen}
            onClose={() => setOptionsDropdown(false)}
          >
            {onRename && (
              <DropdownItem
                text={localizedStrings.rename}
                onClick={() => setEditingName(true)}
              />
            )}
            {onExport && (
              <DropdownItem
                text={localizedStrings.export_account}
                onClick={openExportDropdown}
              />
            )}
            {onForget && (
              <DropdownItem
                text={localizedStrings.forget_account}
                onClick={() => onForget()}
              />
            )}
          </Dropdown>
          <Dropdown
            isOpen={isExportDropdownOpen}
            onClose={closeExportDropdown}
            className="uik-account-selector__export_dropdown"
          >
            <Form>
              <Text type="title">{localizedStrings.export_account}</Text>
              <Input
                label={localizedStrings.password_export}
                type="password"
                error={
                  submittedWithError && !password.length
                    ? localizedStrings.error_password_empty
                    : undefined
                }
                onInput={(e) => setPassword(e.target.value)}
              />
              <div className="uik-dropdown__dropdown-buttons">
                <Button
                  text={localizedStrings.cancel}
                  onClick={closeExportDropdown}
                />
                <Button
                  text={localizedStrings.export}
                  fill
                  onClick={onExportClick}
                />
              </div>
            </Form>
          </Dropdown>
        </div>
      )}

      {isSelected && (
        <div className="uik-account-selector-account__selected-tag">
          {localizedStrings.selected}
        </div>
      )}
    </div>
  );
};

export default Account;
