import type { FormEvent } from "react";

export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type?: "text" | "email" | "number" | "date" | "checkbox" | "select" | "textarea";
  options?: string[];
};

type EntityFormProps<T extends { id: string }> = {
  title: string;
  breadcrumbs: string[];
  fields: FieldConfig<T>[];
  value: T;
  canDelete?: boolean;
  extraAction?: React.ReactNode;
  onChange: (value: T) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
};

export function EntityForm<T extends { id: string }>({
  title,
  breadcrumbs,
  fields,
  value,
  canDelete = false,
  extraAction,
  onChange,
  onSave,
  onCancel,
  onDelete,
}: EntityFormProps<T>) {
  const updateField = (field: FieldConfig<T>, nextValue: string | boolean) => {
    onChange({
      ...value,
      [field.name]: field.type === "number" ? Number(nextValue) : nextValue,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave();
  };

  return (
    <section className="form-panel">
      <div className="breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb}>
            {index > 0 ? ">" : null} {crumb}
          </span>
        ))}
      </div>
      <div className="form-head">
        <h1>{title}</h1>
      </div>
      <form className="entity-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {fields.map((field) => {
            const fieldValue = value[field.name];
            const key = String(field.name);

            if (field.type === "checkbox") {
              return (
                <label className="checkbox-field" key={key}>
                  <input
                    type="checkbox"
                    checked={Boolean(fieldValue)}
                    onChange={(event) => updateField(field, event.target.checked)}
                  />
                  <span>{field.label}</span>
                </label>
              );
            }

            if (field.type === "textarea") {
              return (
                <label className="field field-wide" key={key}>
                  <span>{field.label}</span>
                  <textarea
                    value={String(fieldValue ?? "")}
                    onChange={(event) => updateField(field, event.target.value)}
                  />
                </label>
              );
            }

            if (field.type === "select") {
              return (
                <label className="field" key={key}>
                  <span>{field.label}</span>
                  <select
                    value={String(fieldValue ?? "")}
                    onChange={(event) => updateField(field, event.target.value)}
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            return (
              <label className="field" key={key}>
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  value={String(fieldValue ?? "")}
                  onChange={(event) => updateField(field, event.target.value)}
                />
              </label>
            );
          })}
        </div>
        <div className="form-actions">
          <button className="button button-primary" type="submit">
            Save
          </button>
          <button className="button button-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
          {canDelete ? (
            <button className="button button-danger" type="button" onClick={onDelete}>
              Delete
            </button>
          ) : null}
          {extraAction}
        </div>
      </form>
    </section>
  );
}
