declare module "@changey/react-leaflet-markercluster" {
  import { ComponentType } from "react";
  import { LayerGroupProps } from "react-leaflet";

  export interface MarkerClusterGroupProps extends LayerGroupProps {
    chunkedLoading?: boolean;
    maxClusterRadius?: number;
    showCoverageOnHover?: boolean;
    spiderfyOnEveryZoom?: boolean;
    spiderfyOnClick?: boolean;
    zoomToBoundsOnClick?: boolean;
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
