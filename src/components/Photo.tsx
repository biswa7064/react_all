import { type Photo } from "@/app/photos/page"
import { Collections, PhotoCamera, Tag } from "@mui/icons-material"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material"

export default function Photo({ photo }: { photo: Photo }) {
  return (
    <Card
      key={photo.id}
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box className="relative">
        <CardMedia
          component="img"
          height="200"
          image={photo.url || "/placeholder.svg"}
          alt={photo.title}
          className="object-cover"
        />
        <Chip
          icon={<Tag />}
          label={`#${photo.id}`}
          size="small"
          className="absolute top-2 right-2 bg-black/70 text-white"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            "& .MuiChip-icon": { color: "white" },
          }}
        />
      </Box>

      <CardContent className="flex-grow flex flex-col justify-between p-4">
        <Typography
          variant="subtitle2"
          component="h3"
          className="font-medium mb-3 line-clamp-2 leading-tight"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.5rem",
          }}
        >
          {photo.title}
        </Typography>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Collections fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              Album {photo.albumId}
            </Typography>
          </div>

          <div className="flex items-center gap-1">
            <PhotoCamera fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              600x600
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
