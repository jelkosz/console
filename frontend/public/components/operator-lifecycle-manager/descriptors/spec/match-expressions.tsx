import * as React from 'react';
import * as _ from 'lodash';

import { MatchExpression } from '../../../../module/k8s';
import { Dropdown } from '../../../utils';

export const MatchExpressions: React.FC<MatchExpressionsProps> = (props) => {
  const {matchExpressions, onChangeMatchExpressions, allowedOperators} = props;

  const changeKey = (key: string, index: number) => onChangeMatchExpressions(matchExpressions.map((exp, i) => i === index ? _.set(exp, 'key', key) : exp));
  const changeOperator = (op: MatchExpression['operator'], index: number) => onChangeMatchExpressions(matchExpressions.map((exp, i) => i === index ? _.set(exp, 'operator', op) : exp));
  const changeValue = (value: string, index: number) => onChangeMatchExpressions(matchExpressions.map((exp, i) => i === index ? _.set(exp, 'value', value) : exp));

  return <React.Fragment>
    <div className="row hidden-sm hidden-xs">
      <div className="col-md-4 text-secondary text-uppercase">Key</div>
      <div className="col-md-2 text-secondary text-uppercase">Operator</div>
      <div className="col-md-3 text-secondary text-uppercase">Value</div>
      <div className="col-md-1"></div>
    </div>
    { props.matchExpressions.map((expression, i) => <div className="row" key={i}>
      <div className="col-md-4 col-sm-5 col-xs-5 toleration-modal__field">
        <div className="hidden-md hidden-lg text-secondary text-uppercase">Key</div>
        <input
          type="text"
          className="form-control"
          value={expression.key}
          onChange={e => changeKey(e.target.value, i)} />
      </div>
      <div className="col-md-2 col-sm-5 col-xs-5 toleration-modal__field">
        <div className="hidden-md hidden-lg text-secondary text-uppercase">Operator</div>
        <Dropdown
          className="toleration-modal__dropdown"
          dropDownClassName="dropdown--full-width"
          items={allowedOperators.reduce((acc, o) => ({...acc, [o]: o}), {})}
          onChange={(op: MatchExpression['operator']) => changeOperator(op, i)}
          selectedKey={expression.operator}
          title={expression.operator} />
      </div>
      <div className="clearfix visible-sm visible-xs"></div>
      <div className="col-md-3 col-sm-5 col-xs-5 toleration-modal__field">
        <div className="hidden-md hidden-lg text-secondary text-uppercase">Value</div>
        <input
          type="text"
          className="form-control"
          value={(expression as any).value || ''}
          onChange={(e) => changeValue(e.target.value, i)}
          readOnly={['Exists', 'DoesNotExist'].includes(expression.operator)} />
      </div>
      <div className="col-md-1 col-sm-2 col-xs-2">
        <button
          type="button"
          className="btn btn-link btn-link--inherit-color toleration-modal__delete-icon"
          onClick={() => props.onChangeMatchExpressions(props.matchExpressions.filter((e, index) => index !== i))}
          aria-label="Delete">
          <i className="fa fa-minus-circle pairs-list__side-btn pairs-list__delete-icon" aria-hidden="true" />
        </button>
      </div>
    </div>) }
    <div className="row">
      <button
        type="button"
        className="btn btn-link"
        style={{marginLeft: '10px'}}
        onClick={() => onChangeMatchExpressions(matchExpressions.concat({key: '', operator: 'Exists'}))}>
        <i aria-hidden="true" className="fa fa-plus-circle pairs-list__add-icon" />Add More
      </button>
    </div>
  </React.Fragment>;
};

export type MatchExpressionsProps = {
  matchExpressions: MatchExpression[];
  onChangeMatchExpressions: (matchExpressions: MatchExpression[]) => void;
  allowedOperators: MatchExpression['operator'][];
};

MatchExpressions.displayName = 'MatchExpressions';
