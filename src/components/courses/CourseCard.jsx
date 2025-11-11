import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  duration,
  students,
  rating,
  price,
  category,
  image,
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">{category}</span>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students}+ students</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Instructor</p>
            <p className="font-medium">{instructor}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${price}</p>
          </div>
        </div>

        <Link to={`/courses/${id}`} className="block w-full">
          <Button className="w-full bg-primary hover:bg-primary-hover">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CourseCard;
