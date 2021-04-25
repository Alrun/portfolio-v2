import React from 'react';

import classes from './App.module.scss';
import Table from '../Table/Table';
import Dropdown from '../../ui/Dropdown/Dropdown';
import Tooltip from '../../ui/Tooltip/Tooltip';
import Popover from '../../ui/Popover/Popover';
import Button from '../../ui/Button/Button';
import Checkbox from '../../ui/Checkbox/Checkbox';

export default function App() {
    return (
        <div className={classes.app}>
            <h2>Checkbox</h2>
            <div>
                <div>
                    <Checkbox />
                    <Checkbox isChecked />
                    <Checkbox isChecked variant="indeterminate" />
                    <Checkbox>Primary</Checkbox>
                    <Checkbox isChecked>Primary</Checkbox>
                </div>
                <div>
                    <Checkbox isDisabled />
                    <Checkbox isChecked isDisabled />
                    <Checkbox variant="indeterminate" isDisabled />
                    <Checkbox isDisabled>Disabled</Checkbox>
                    <Checkbox isChecked isDisabled>
                        Disabled
                    </Checkbox>
                </div>
                <div>
                    <Checkbox color="secondary" />
                    <Checkbox color="secondary" isChecked />
                    <Checkbox variant="indeterminate" color="secondary" />
                    <Checkbox color="secondary">Secondary</Checkbox>
                    <Checkbox color="secondary" isChecked>
                        Secondary
                    </Checkbox>
                </div>
                <div>
                    <Checkbox color="success" />
                    <Checkbox color="success" isChecked />
                    <Checkbox color="success" variant="indeterminate" />
                    <Checkbox color="success">Success</Checkbox>
                    <Checkbox color="success" isChecked>
                        Success
                    </Checkbox>
                </div>
                <div>
                    <Checkbox color="danger" />
                    <Checkbox color="danger" isChecked />
                    <Checkbox color="danger" variant="indeterminate" />
                    <Checkbox color="danger">Danger</Checkbox>
                    <Checkbox color="danger" isChecked>
                        Danger
                    </Checkbox>
                </div>
                <div>
                    <Checkbox ripple={false}>No ripple</Checkbox>
                    <Checkbox>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto aspernatur deserunt
                        dignissimos enim exercitationem, iusto laudantium maxime minima molestiae nam nisi non nostrum
                        possimus quidem saepe, sapiente! Cumque, reprehenderit. Accusamus aspernatur corporis dicta
                        facilis iure natus quibusdam reiciendis sint totam voluptatum. Commodi consequuntur enim modi
                        neque officiis qui sapiente, tenetur voluptatem. Accusantium aliquam, blanditiis eum quod
                        reiciendis tempore temporibus!
                    </Checkbox>
                </div>
            </div>

            <h2 style={{ margin: '3rem 0 2rem' }}>Dropdown</h2>
            <div>
                <Dropdown />
            </div>

            <h2 style={{ margin: '3rem 0 2rem' }}>Tooltip</h2>
            <div className="btn-example">
                <Tooltip content="Tooltip content">
                    <Button variant="filled">Default</Button>
                </Tooltip>
                <Tooltip
                    content={
                        <span>
                            Tooltip content <a href="#anchor">Link</a>
                        </span>
                    }
                    interactive
                >
                    <Button variant="filled">Interactive</Button>
                </Tooltip>
            </div>

            <h2 style={{ margin: '3rem 0 2rem' }}>Popover</h2>
            <div>
                <Popover
                    content={
                        <span>
                            Tooltip content <a href="#anchor">Link</a>
                        </span>
                    }
                    interactive
                >
                    <Button variant="filled">Interactive</Button>
                </Popover>
            </div>

            <h2>Buttons</h2>
            <h3 style={{ margin: '3rem 0 2rem' }}>Filled</h3>
            <div>
                <div className="btn-example">
                    <Button variant="filled" size="small">
                        Small
                    </Button>
                    <Button variant="filled">Primary</Button>
                    <Button variant="filled" size="large">
                        Large
                    </Button>
                    <Button variant="filled" size="small" isDisabled>
                        Small
                    </Button>
                    <Button variant="filled" isDisabled>
                        Primary
                    </Button>
                    <Button variant="filled" size="large" isDisabled>
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        variant="filled"
                        color="primary"
                        size="small"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Start
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        size="small"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Primary
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        variant="filled"
                        color="primary"
                        size="small"
                        iconEnd={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        iconEnd={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        End
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        iconEnd={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        size="small"
                        isDisabled
                        iconEnd={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        isDisabled
                        iconEnd={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Primary
                    </Button>
                    <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        isDisabled
                        iconEnd={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        variant="filled"
                        color="primary"
                        size="small"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="filled"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="filled"
                        color="primary"
                        size="small"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="filled"
                        color="primary"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                </div>
                <div className="btn-example">
                    <Button variant="filled" color="secondary">
                        Secondary
                    </Button>
                    <Button variant="filled" color="danger">
                        Danger
                    </Button>
                    <Button variant="filled" color="success">
                        Success
                    </Button>
                </div>
                <div className="btn-example">
                    <Button variant="filled" href="#" color="primary">
                        Link
                    </Button>
                    <Button
                        variant="filled"
                        href="#"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Link
                    </Button>
                    <Button variant="filled" href="#" color="primary" isDisabled>
                        Disabled
                    </Button>
                </div>
            </div>

            <h3 style={{ margin: '3rem 0 2rem' }}>Outline</h3>
            <div>
                <div className="btn-example">
                    <Button variant="outline" size="small">
                        Small
                    </Button>
                    <Button variant="outline">Primary</Button>
                    <Button variant="outline" size="large">
                        Large
                    </Button>
                    <Button variant="outline" size="small" isDisabled>
                        Small
                    </Button>
                    <Button variant="outline" isDisabled>
                        Primary
                    </Button>
                    <Button variant="outline" size="large" isDisabled>
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        variant="outline"
                        color="primary"
                        size="small"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        variant="outline"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Primary
                    </Button>
                    <Button
                        variant="outline"
                        color="primary"
                        size="large"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                    <Button
                        variant="outline"
                        color="primary"
                        size="small"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        variant="outline"
                        color="primary"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Primary
                    </Button>
                    <Button
                        variant="outline"
                        color="primary"
                        size="large"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        variant="outline"
                        color="primary"
                        size="small"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="outline"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="outline"
                        color="primary"
                        size="large"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="outline"
                        color="primary"
                        size="small"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="outline"
                        color="primary"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        variant="outline"
                        color="primary"
                        size="large"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                </div>
                <div className="btn-example">
                    <Button variant="outline" color="secondary">
                        Secondary
                    </Button>
                    <Button variant="outline" color="danger">
                        Danger
                    </Button>
                    <Button variant="outline" color="success">
                        Success
                    </Button>
                </div>
                <div className="btn-example">
                    <Button variant="outline" href="#" color="primary">
                        Link
                    </Button>
                    <Button
                        variant="outline"
                        href="#"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Link
                    </Button>
                    <Button variant="outline" href="#" color="primary" isDisabled>
                        Disabled
                    </Button>
                </div>
            </div>

            <h3 style={{ margin: '3rem 0 2rem' }}>Default</h3>
            <div>
                <div className="btn-example">
                    <Button size="small">Small</Button>
                    <Button>Primary</Button>
                    <Button size="large">Large</Button>
                    <Button size="small" isDisabled>
                        Small
                    </Button>
                    <Button isDisabled>Primary</Button>
                    <Button size="large" isDisabled>
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        color="primary"
                        size="small"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Primary
                    </Button>
                    <Button
                        color="primary"
                        size="large"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                    <Button
                        color="primary"
                        size="small"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Small
                    </Button>
                    <Button
                        color="primary"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Primary
                    </Button>
                    <Button
                        color="primary"
                        size="large"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Large
                    </Button>
                </div>
                <div className="btn-example">
                    <Button
                        color="primary"
                        size="small"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        color="primary"
                        size="large"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        color="primary"
                        size="small"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        color="primary"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                    <Button
                        color="primary"
                        size="large"
                        isDisabled
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    />
                </div>
                <div className="btn-example">
                    <Button color="secondary">Secondary</Button>
                    <Button color="danger">Danger</Button>
                    <Button color="success">Success</Button>
                </div>
                <div className="btn-example">
                    <Button href="#" color="primary">
                        Link
                    </Button>
                    <Button
                        href="#"
                        color="primary"
                        iconStart={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        }
                    >
                        Link
                    </Button>
                    <Button href="#" color="primary" isDisabled>
                        Disabled
                    </Button>
                </div>
            </div>

            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <Table />
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
        </div>
    );
}
