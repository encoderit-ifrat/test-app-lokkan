import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({
  BreadcrumbsData,
  lastStageData,
  style,
}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={style}>
        {BreadcrumbsData?.map((data, index) => (
          <Link
            key={index}
            href={`/${data.route}`}

            // href="/material-ui/getting-started/installation/"
          >
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
                width: "100%",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              {data.stage}
            </a>
          </Link>
        ))}

        <Typography color="text.primary">{lastStageData}</Typography>
      </Breadcrumbs>
    </div>
  );
}
