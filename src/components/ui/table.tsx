import * as React from "react";

import { cn } from "@/lib/utils";

export type Column<T> =
  | {
      key: Extract<keyof T, string>;
      title: React.ReactNode;
      render?: (row: T) => React.ReactNode;
    }
  | {
      key: "__display";
      title?: React.ReactNode;
      render: (row: T) => React.ReactNode;
    };

type TableProps<T> = React.TableHTMLAttributes<HTMLTableElement> & {
  columns?: Column<T>[];
  data?: T[];
  columnOrder?: Array<Extract<keyof T, string> | "__display">;
  getRowKey?: (row: T, index: number) => React.Key;
};

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function Table<T>({
  className,
  columns,
  data,
  columnOrder,
  getRowKey,
  children,
  ...props
}: TableProps<T>) {
  const shouldRenderFromColumns =
    Array.isArray(columns) && columns.length > 0 && Array.isArray(data);

  const orderedColumns = React.useMemo(() => {
    if (!columns) return [];
    if (!columnOrder || columnOrder.length === 0) return columns;

    const columnMap = new Map(columns.map((col) => [col.key, col]));
    const explicitlyOrdered = columnOrder
      .map((key) => columnMap.get(key))
      .filter(Boolean) as Column<T>[];
    const remaining = columns.filter((col) => !columnOrder.includes(col.key));

    return [...explicitlyOrdered, ...remaining];
  }, [columns, columnOrder]);

  const rows = React.useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const duplicateRowKeys = React.useMemo(() => {
    if (!getRowKey) return new Set<React.Key>();

    const counts = new Map<React.Key, number>();

    rows.forEach((row, index) => {
      const key = getRowKey(row, index);
      if (key === null || key === undefined) return;

      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    return new Set(
      Array.from(counts.entries())
        .filter(([, count]) => count > 1)
        .map(([key]) => key)
    );
  }, [getRowKey, rows]);

  return (
    <div
      data-slot="table-container"
      className="relative w-full mx-auto max-w-[350px] sm:max-w-[95vw] **:border-card-border/20 border rounded overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      >
        {shouldRenderFromColumns ? (
          <>
            <TableHeader>
              <TableRow>
                {orderedColumns.map((col) => (
                  <TableHead key={col.key}>{col.title}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row, rowIndex) => {
                const rowKey = getRowKey?.(row, rowIndex);
                const resolvedRowKey =
                  rowKey == null
                    ? rowIndex
                    : duplicateRowKeys.has(rowKey)
                    ? `${rowKey}-${rowIndex}`
                    : rowKey;

                return (
                  <TableRow key={resolvedRowKey}>
                    {orderedColumns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(row)
                          : col.key !== "__display"
                          ? (row[col.key] as React.ReactNode)
                          : null}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          children
        )}
      </table>
    </div>
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors odd:bg-background-200",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "py-3 px-2 text-text-primary-500 bg-background text-caption-small text-start align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "py-4 px-2 text-text-secondary align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
