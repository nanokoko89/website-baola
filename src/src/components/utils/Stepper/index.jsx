// src/components/Stepper/Stepper.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./Stepper.module.scss";

const cx = classNames.bind(styles);

/**
 * Props:
 *  - steps: Array<{ key: string, label: string }>
 *  - activeStep: string (key của step hiện tại)
 *  - onStepClick (tuỳ chọn): callback khi click vào bước (nếu muốn cho phép user click chuyển bước)
 */
export default function Stepper({ steps, activeStep, onStepClick }) {
  return (
    <div className={cx("stepper")}>
      {steps.map((step, idx) => {
        const isActive = step.key === activeStep;
        const isCompletedIdx =
          steps.findIndex((s) => s.key === activeStep) > idx;
        return (
          <React.Fragment key={step.key}>
            <div
              className={cx("stepper__item", {
                active: isActive,
                completed: isCompletedIdx,
              })}
              onClick={() => onStepClick && onStepClick(step.key)}
            >
              <div className={cx("stepper__circle")}>
                {isCompletedIdx ? "✓" : idx + 1}
              </div>
              <div className={cx("stepper__label")}>{step.label}</div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cx("stepper__bar", {
                  filled: idx < steps.findIndex((s) => s.key === activeStep),
                })}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
