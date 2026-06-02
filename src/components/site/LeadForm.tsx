import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { t, tf, tx } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const c = siteConfig;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: real endpoint wires up via c.leadFormEndpoint
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-900">
        <div className="font-semibold mb-1">{t("form.received")}</div>
        <div className="text-sm">{tx(c.leadFormSuccessMessage, c.leadFormSuccessMessageEs)}</div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-xl p-6 card-shadow space-y-4">
      <div className="text-sm text-slate-600 mb-1">{tx(c.leadFormSlaPromise, c.leadFormSlaPromiseEs)}</div>
      {c.leadFormFields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block text-sm font-medium text-slate-700 mb-1.5">
            {tf(`form.fields.${f.name}`, f.label)}{f.required && <span className="text-brand-accent ml-0.5">*</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              id={f.name}
              name={f.name}
              required={f.required}
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
          ) : f.type === "select" ? (
            <select
              id={f.name}
              name={f.name}
              required={f.required}
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            >
              <option value="" disabled>{t("form.select")}</option>
              {f.options?.map((o) => <option key={o} value={o}>{tf(`form.options.${o}`, o)}</option>)}
            </select>
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.required}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
          )}
        </div>
      ))}
      <Button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold h-12">
        {t("form.submit")}
      </Button>
    </form>
  );
}
