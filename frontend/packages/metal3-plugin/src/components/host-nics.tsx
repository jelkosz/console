import * as React from 'react';
import { OutlinedCheckSquareIcon, OutlinedSquareIcon } from '@patternfly/react-icons';
import { sortable } from '@patternfly/react-table';

import { Table, TableRow, TableData } from '@console/internal/components/factory';
import { K8sResourceKind } from '@console/internal/module/k8s';
import { getHostNICs } from '../selectors';
import { BaremetalHostNIC } from '../types';

const NICsTableHeader = () => [
  { title: 'Name', sortField: 'name', transforms: [sortable] },
  { title: 'Model', sortField: 'model', transforms: [sortable] },
  { title: 'PXE', sortField: 'pxe', transforms: [sortable] },
  { title: 'IP', sortField: 'ip', transforms: [sortable] },
  { title: 'Speed', sortField: 'speedGbps', transforms: [sortable] },
  { title: 'MAC Address', sortField: 'mac', transforms: [sortable] },
  { title: 'VLAN ID', sortField: 'vlanId', transforms: [sortable] },
];

type NICsTableRowProps = {
  obj: BaremetalHostNIC;
  index: number;
  key?: string;
  style: React.StyleHTMLAttributes<any>;
};

const NICsTableRow: React.FC<NICsTableRowProps> = ({ obj: nic, index, key, style }) => {
  const { ip, mac, model, name, pxe, speedGbps, vlanId } = nic;
  return (
    <TableRow id={ip} index={index} trKey={key} style={style}>
      <TableData>{name}</TableData>
      <TableData>{model}</TableData>
      <TableData>{pxe ? <OutlinedCheckSquareIcon /> : <OutlinedSquareIcon />}</TableData>
      <TableData>{ip}</TableData>
      <TableData>{speedGbps} Gbps</TableData>
      <TableData>{mac}</TableData>
      <TableData>{vlanId}</TableData>
    </TableRow>
  );
};

type BaremetalHostNICListProps = {
  obj: K8sResourceKind;
};

const BaremetalHostNICList: React.FC<BaremetalHostNICListProps> = ({ obj: host }) => {
  const nics = getHostNICs(host);
  return (
    <div className="co-m-list">
      <div className="co-m-pane__body">
        <Table
          data={nics}
          aria-label="Baremetal Host NICs"
          Header={NICsTableHeader}
          Row={NICsTableRow}
          loaded
        />
      </div>
    </div>
  );
};

export default BaremetalHostNICList;
