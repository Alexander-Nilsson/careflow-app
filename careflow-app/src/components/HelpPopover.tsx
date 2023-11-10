import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { QuestionCircleFill} from 'react-bootstrap-icons';

interface HelpPopoverProps {
    content: string;
}

const QuestionmarkStyle = {
    marginRight: "10px",
    marginBottom: "3px",
    color: "#051F6F",
    width: "25px",
    height: "25px",
};

const HelpPopover: React.FC<HelpPopoverProps> = ({ content }) => {
    const popoverContent = (
        <Popover id="popover-positioned-right" title="Popover right" style ={{ padding: "10px"}}>
            {content}
        </Popover>
    );

return (
    <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popoverContent}>
        <QuestionCircleFill style={QuestionmarkStyle}></QuestionCircleFill>
    </OverlayTrigger>
    );
}

export default HelpPopover;